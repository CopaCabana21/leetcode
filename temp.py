print([[0]*len([1,2,3]) for i in range(2)])


class Solution:
    def maxSubArray(self, nums):
        def solve(i, must_pick):
            if i >= len(nums):
                return 0 if must_pick else -inf
            return max(
                nums[i] + solve(i+1, True), 
                0 if must_pick else solve(i+1, False)
                )
        return solve(0, False)