export function kthLargestElement(nums: number[], k: number): number {
  k = nums.length - k;

  const quickSelect = (
    nums: number[],
    l: number,
    r: number,
    k: number,
  ): number => {
    const pivot = nums[r];
    let p = l;

    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }

    if (p > k) return quickSelect(nums, l, p - 1, k);
    if (p < k) return quickSelect(nums, p + 1, r, k);
    return nums[p];
  };

  return quickSelect(nums, 0, nums.length - 1, k);
}
