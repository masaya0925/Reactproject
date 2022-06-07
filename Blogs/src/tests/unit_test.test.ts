import { dummy } from "../utils/list_helper";
import { BlogType } from "../utils/types";

test('dummy return 1', () => {
    const blogs: BlogType[] = [];
    
    const result = dummy(blogs);
    expect(result).toBe(1);
});