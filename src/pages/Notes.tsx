import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import FixedAddButton from '../components/FixedAddButton';
import UserAvatar from '../components/UserAvatar';
import Row from '../components/Row';
import { Button } from '@mui/material';
import { displayContacts } from '../services/realmServices';
import Loader from '../components/Loader';
import { StyledParagraph } from '../components/StyledParagraph';
import { formatTime, ITEMS_PER_PAGE } from '../utils/helper';

export default function Notes() {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement | null>(null);

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'contacts',
    ({ pageParam = 1 }) => displayContacts(ITEMS_PER_PAGE, pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === ITEMS_PER_PAGE ? allPages.length + 1 : undefined,
    }
  );

  const allRows = data
    ? data.pages.flatMap((d) => d).filter((item) => item.lastChat)
    : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (
      lastItem &&
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <StyledParagraph height="50vh">
        Error: {(error as Error).message}
      </StyledParagraph>
    );
  }

  return (
    <>
      <div
        ref={parentRef}
        style={{ height: `67.5vh`, width: `100%`, overflow: 'auto' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const item = allRows[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    'Loading more...'
                  ) : (
                    'Nothing more to load'
                  )
                ) : (
                  <Row key={item._id} style={{ marginBottom: -30 }}>
                    <Button
                      sx={{ width: '100%' }}
                      onClick={() => navigate({ to: `/chatpage/${item._id}` })}
                    >
                      <Row style={{ cursor: 'pointer', width: '100%',marginTop:5 }}>
                        <Row type="vertical">
                          <Row>
                            <UserAvatar
                              name={item.name}
                              mobile={item.phone}
                              lastChat={item.lastChat}
                            />
                          </Row>
                        </Row>

                        <Row
                          type="vertical"
                          style={{
                            marginTop: -50,
                            fontSize: 12,
                            color: 'black',
                          }}
                        >
                          {formatTime(item.lastSeen)}
                        </Row>
                      </Row>
                    </Button>
                  </Row>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <FixedAddButton onClick={() => navigate({ to: '/newContacts' })} />
    </>
  );
}
