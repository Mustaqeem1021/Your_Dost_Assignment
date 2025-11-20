# DSA Problem — Second Largest Unique Number

This folder contains the solution for the DSA problem given in the assignment.  
The task is to find the **second largest unique number** in an array.

---

## 🧠 Problem Statement

Given an array of integers, return the **second largest unique number**.  
If it does not exist, return `-1`.

### Example:
Input:
[3, 5, 2, 5, 6, 6, 1]

Output:
5

Input:
[7, 7, 7]

Output:
-1

## 🚀 Approach

1. Read input array from **STDIN**  
2. Convert to a list of integers  
3. Remove duplicates  
4. Sort in descending order  
5. If 2nd largest exists → return it  
6. Otherwise return `-1`  

This solution runs in **O(n log n)** time due to sorting,  
which satisfies the expected performance requirement.
