NODEJS API
- GET  /api/v1/articles?page=1&size=20
- GET  /api/v1/articles/:id 
Params {
    aId: <articlesId>
}
- POST /api/v1/articles
Body {
    title: <string>
    content: <string>
    nickname: <string>
}
- GET  /api/v1/comments?aId=<articlesId>
Query {
    aId: <articlesId>
}
- POST /api/v1/comments
Body {
    content: <string>
    nickname: <string>
    aId: <articlesId>
    cId: __ null // comment
         \_ <commentsId> // comment on a comment 
}

INSTALL 
- npm i

START APP
- npm run start

TESTING API
- npm run test