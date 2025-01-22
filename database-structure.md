users
└── userId
      ├── avatar
      ├── email
      ├── userId
      ├── username
      ├── diaries 
            └── diaryId : true 
books
└── bookId ( inbs )
      ├── author
      ├── description
      ├── diaries
      └── diaryId : true
      ├── id
      ├── image
      ├── link
      ├── title

diaries
└── diaryId
      ├── bookId
      ├── bookImage
      ├── bookTitle
      ├── createdAt
      ├── diaryId
      ├── diaryTitle
      ├── userId 
      ├── postsId 

likes
└── diaryId
      └── userId : true 

posts
└── postId  
      ├── diaryId 
      ├── content
      ├── createdAt
      ├── title
