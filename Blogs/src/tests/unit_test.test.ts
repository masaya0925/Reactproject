import { dummy, favoriteBlog, totalLikes } from "../utils/list_helper";
import { BlogType } from "../utils/types";

const onlyOneBlog: BlogType[] = [
    {
         _id: "5a422a851b54a676234d17f7",
         title: "React patterns",
         author: "Michael Chan",
         url: "https://reactpatterns.com/",
         likes: 7,
         __v: 0
     }
 ];

const blogList: BlogType[] = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
];
const blogList2: BlogType[] = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 12,
        __v: 0
    }
];

test('dummy return 1', () => {
    const blogs: BlogType[] = [];
    
    const result = dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {

    test('of empty list of zero', () => {
        const result = totalLikes([]);
        expect(result).toBe(0);
    });
    test('when list has only one blog equals the like of that', () => {
        const result = totalLikes(onlyOneBlog);
        expect(result).toBe(7);
    });
    test('of a bigger list is calculated right', () => {
        const result = totalLikes(blogList);
        expect(result).toBe(36);
    });
});

describe('favoriteBlog', () => {

    test('most like blogs', () => {
        const result = favoriteBlog(blogList);
        const answer = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        };
        expect(result).toEqual(answer);
    });

    test('many most like blogs', () => {
        const result = favoriteBlog(blogList2);
        const answer = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        };
        expect(result).toEqual(answer);
    });
    test('of empty blogList', () => {
        const result = favoriteBlog([]);
        expect(result).toBe(null);
    });
});