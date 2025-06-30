import heapq

events = []  # will contain (x, height, end)
for l, r, h in buildings:
    events.append((l, -h, r))  # building enters
    events.append((r, 0, 0))   # building leaves (height 0)

# Sort by x, then height
events.sort()

res = []
heap = [(0, float('inf'))]  # (neg height, end)
prev_height = 0

for x, neg_h, r in events:
    if neg_h != 0:
        heapq.heappush(heap, (neg_h, r))  # add building
    else:
        # Lazy deletion will clean this up below
        pass

    # Remove buildings that ended
    while heap and heap[0][1] <= x:
        heapq.heappop(heap)

    curr_height = -heap[0][0] if heap else 0
    if curr_height != prev_height:
        res.append([x, curr_height])
        prev_height = curr_height
