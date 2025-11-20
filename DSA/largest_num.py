arr = list(map(int, input().strip().split()))

unique_num = sorted(set(arr), reverse=True)

if len(unique_nums) < 2:
    print(-1)
else:
    print(unique_nums[1])
