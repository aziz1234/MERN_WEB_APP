
   const a= {
    "critics": [
        {
            "_id": "5f264d73b4fa441588eb894c",
            "user": "5f23fa9ffb9411099caa9dc0",
            "bookShelf": [
                {
                    "date": "2020-08-02T06:24:44.579Z",
                    "_id": "5f265c2cd6225d242ca4765d",
                    "bookId": "5f2285055de6a821c8ce0701",
                    "status": "dropped",
                    "rating": 4,
                    "review": "trash"
                },
                {
                    "date": "2020-08-02T06:32:19.550Z",
                    "_id": "5f265df3c2b4fd2348d7b9d4",
                    "bookId": "5f2582f4b0c2282528fa8d2a",
                    "status": "reading"
                }
            ],
            "__v": 0
        },
        {
            "_id": "5f26cbee4388482724fbf1a6",
            "user": "5f239c07d117621bd431a83f",
            "bookShelf": [
                {
                    "date": "2020-08-02T14:21:34.433Z",
                    "_id": "5f26cbee4388482724fbf1a7",
                    "bookId": "5f2582f4b0c2282528fa8d2a",
                    "status": "plan to read"
                }
            ],
            "__v": 0
        }
    ]
}
console.log(a.filter(x=>x.bookShelf.bookId=="5f26cbee4388482724fbf1a7"))
