public class practice {
  public static void main(String[] args) {
    int[][] array = {
        { 1, 2, 3 },
        { 4, 5, 6 },
        { 7, 8, 9 }
    };

    for (int r = 0; r < array.length; ++r) {
      for (int c = 0; c < array[r].length; ++c) {
        System.out.print("[" + array[r][c] + "]");
        if (c == array[r].length - 1) {
          System.out.print("\n");
        }
      }
    }

  }
}
