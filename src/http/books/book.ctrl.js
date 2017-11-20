const _ = require('lodash')
const BooskServices = require('../../services/book.service');


class bookCtrl {

    constructor() {
        this.bookService = new BooskServices();
    }

    getBookById(req, res) {
        let id = req.params.id;

        this.bookService.getBookById(id)
            .then((book) => {
                if (book == undefined) {
                    res.status(404);
                    res.send()
                }
                res.json(book)
            }).catch((err) => {
                res.status(404);
                res.send()
            })

    }

    getAll(req, res) {
        this.bookService.getAllBooks()
            .then((books) => {
                res.json(books);
            })
            .catch((err) => {
                res.status(404);
                res.end();
            })
    }

    //getAll(req, res) {
    //  res.json(books)
    //}

    // delete(req, res) {

    //     let id = req.params.id;
    //     let removedBooks = _.remove(books, o => o.id == id);

    //     if (removedBooks.length == 0) {
    //         res.status(404);
    //         res.send()
    //     }
    //     else {
    //         res.json(removedBooks[0]);
    //     }
    // }

    delete(req, res) {

        let id = req.params.id;
        this.bookService.deleteByID(id)
            .then((rowDeleted)=>{
                if (rowDeleted === 1) {
                    console.log('Deleted successfully');
                    res.status(200)
                }
                else{
                    res.status(500)
                    res.end()
                }}).catch((err)=>{
                    res.status(500)
                    res.end()
                }) 
    }



    //Create
    create(req, res) {

        let newBook = req.body;

        this.bookService.create(newBook)
            .then((newBook) => {
                res.send(newBook);
            })
            .catch((err) => {
                res.status(500)
                res.end();
            })


    }

    // create(req, res) {



    //     let sorted = _.sortBy(books, o => o.id, 'asc');
    //     let index = sorted[sorted.length - 1].id + 1;

    //     let newBook = req.body;
    //     newBook.id = index;
    //     books.push(newBook);

    //     res.send(newBook);
    // }

    update(req, res) {
        let id = req.params.id;
        let book = _.find(books, { 'id': id });
        let updatedBook = req.body

        if (book == undefined) {
            res.status(404);
            res.send()
        }

        else {

            for (let key in updatedBook) {
                book[key] = updatedBook[key];
            }

            res.send(book);
        }
    }
    // update(req, res) {
    //     let id = req.params.id;
    //     let book = _.find(books, { 'id': id });
    //     let updatedBook = req.body

    //     if (book == undefined) {
    //         res.status(404);
    //         res.send()
    //     }

    //     else {

    //         for (let key in updatedBook) {
    //             book[key] = updatedBook[key];
    //         }

    //         res.send(book);
    //     }
    // }
}

module.exports = bookCtrl;



var books = [
    {
        "id": 0,
        "name": "Robin Fox",
        "author": "Harding Prince",
        "discription": "Aute enim nulla officia sunt laboris minim sit esse. Elit eiusmod est non nostrud nisi Lorem qui amet elit sit velit. Esse amet exercitation laboris non aute veniam sunt esse in. Aute enim commodo nostrud velit dolor cupidatat. Cupidatat duis voluptate nostrud aute veniam sint. Aliquip exercitation qui sint velit. Ea veniam nulla eu quis fugiat amet quis aliqua sit.\r\n"
    },
    {
        "id": 1,
        "name": "Shelley Franco",
        "author": "Short Burris",
        "discription": "Enim esse aliquip ea elit amet. Laboris quis deserunt tempor reprehenderit mollit aliquip irure laboris in ex nostrud. Proident eu voluptate Lorem sit in dolor proident ex qui anim ut aliqua fugiat. Culpa excepteur ex cillum minim non. Ea non deserunt duis nostrud. Ullamco ullamco sit fugiat aliqua veniam commodo proident cupidatat.\r\n"
    },
    {
        "id": 2,
        "name": "Kathleen Kirby",
        "author": "Dominguez Mcconnell",
        "discription": "Velit aliquip labore veniam elit deserunt ea. Elit minim reprehenderit Lorem officia ullamco duis excepteur veniam ullamco. Ullamco magna ullamco ex proident ex ullamco laborum incididunt. Magna laboris nisi magna ea officia aliqua veniam aliqua ea officia sit dolor ad. Duis aute aliqua ea occaecat minim in adipisicing reprehenderit incididunt. Minim irure deserunt deserunt ut aute id anim fugiat proident ea ipsum id cupidatat nulla. Laboris eiusmod velit laboris culpa ex culpa incididunt sint quis culpa.\r\n"
    },
    {
        "id": 3,
        "name": "Marie Paul",
        "author": "Diana Ryan",
        "discription": "Sint amet mollit irure irure et velit esse laboris. Commodo exercitation eu mollit magna non dolor ad et cupidatat id. Veniam Lorem dolore amet reprehenderit ut labore aute minim mollit eu laboris et. Occaecat irure ad amet in. Irure in ut adipisicing Lorem cupidatat elit sunt esse aute adipisicing incididunt magna elit. Qui est et quis ad voluptate.\r\n"
    },
    {
        "id": 4,
        "name": "Butler Franklin",
        "author": "Klein Owens",
        "discription": "Est eiusmod et laborum amet amet laborum adipisicing. Cupidatat non id sunt quis consequat nisi eiusmod commodo nisi. Incididunt fugiat veniam tempor Lorem irure irure non. Ut amet amet culpa ut officia occaecat adipisicing voluptate. Elit nisi mollit ad laboris sit sint sint ex minim amet duis ullamco exercitation. Cillum consectetur consectetur ut minim nulla. Et dolore culpa esse amet voluptate veniam.\r\n"
    },
    {
        "id": 5,
        "name": "Pratt Sykes",
        "author": "Taylor Mcgowan",
        "discription": "Incididunt quis voluptate laborum aliqua aliqua duis aliquip exercitation sit nostrud. Deserunt nisi proident ex elit aliqua quis officia tempor adipisicing exercitation nisi. Eu excepteur laborum aliquip proident quis aliqua. Non ipsum qui laborum pariatur do. Officia ipsum occaecat in enim laborum aute ex voluptate velit. Exercitation pariatur est aute ullamco esse amet qui. Reprehenderit ut et aliqua consectetur dolor aliquip in.\r\n"
    },
    {
        "id": 6,
        "name": "Pearl Wilson",
        "author": "Vivian Bowers",
        "discription": "Ipsum cupidatat velit deserunt commodo consequat enim do ad velit. Sunt cillum occaecat ullamco laborum do reprehenderit. Dolor exercitation anim commodo pariatur pariatur voluptate mollit ullamco aute. Nulla Lorem enim fugiat tempor sint sint elit deserunt exercitation qui aute exercitation laborum dolore. Sunt consequat do enim sunt officia veniam veniam. Cupidatat amet elit in quis culpa commodo anim est reprehenderit ut veniam reprehenderit tempor consectetur. Enim occaecat aute aliqua consectetur enim commodo nostrud excepteur.\r\n"
    },
    {
        "id": 7,
        "name": "Shawn Schwartz",
        "author": "Juliana Berry",
        "discription": "Non aliqua adipisicing enim officia sit ea in et. Cillum ex ullamco ea duis eu incididunt laboris cupidatat qui nisi. Ipsum reprehenderit sit irure eu cupidatat adipisicing culpa consectetur velit amet adipisicing irure velit exercitation.\r\n"
    },
    {
        "id": 8,
        "name": "Adriana Quinn",
        "author": "Mercedes Buck",
        "discription": "Quis incididunt sit eu amet labore esse veniam. Aliquip esse qui ut fugiat adipisicing nulla nostrud reprehenderit est mollit do. Non cillum sunt ad nulla minim culpa ex duis quis est excepteur ex. Lorem adipisicing mollit ipsum laborum sunt ex sunt veniam esse anim deserunt ipsum eu. Cillum voluptate amet velit dolor cupidatat et fugiat sint esse.\r\n"
    },
    {
        "id": 9,
        "name": "Valeria Wolf",
        "author": "Cathryn Miles",
        "discription": "Cupidatat consectetur labore mollit tempor proident deserunt id culpa est duis. Id ea veniam duis aliqua consequat in tempor dolor occaecat. Dolore dolore adipisicing Lorem incididunt officia ad tempor qui sit consectetur proident cillum ut do. Nisi ut laborum veniam enim sint ea. Id reprehenderit incididunt dolor incididunt.\r\n"
    }
]