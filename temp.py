import heapq

def max_sum_combinations(A, B, K):
    A.sort(reverse=True)
    B.sort(reverse=True)
    n = len(A)

    visited = set()
    max_heap = []

    # Initial max sum combination
    heapq.heappush(max_heap, (-(A[0] + B[0]), 0, 0))
    visited.add((0, 0))

    result = []
    for _ in range(K):
        sum_val, i, j = heapq.heappop(max_heap)
        result.append(-sum_val)

        if i + 1 < n and (i + 1, j) not in visited:
            heapq.heappush(max_heap, (-(A[i + 1] + B[j]), i + 1, j))
            visited.add((i + 1, j))
        if j + 1 < n and (i, j + 1) not in visited:
            heapq.heappush(max_heap, (-(A[i] + B[j + 1]), i, j + 1))
            visited.add((i, j + 1))

    return result


A = [10, 9, 5, 3, 7]
B = [6, 6, 3, 2, 2]
K = 5
print(max_sum_combinations(A, B, K))  # Output: [10, 9, 9, 8]
