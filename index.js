require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const connectDatabase = require('./helpers/connectDatabase');

const app = express();

app.engine(
  'handlebars',
  exphbs({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/admin', express.static('views/admin'));

app.use('/', routers);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

connectDatabase();

/*const path = require("path"); //path.resolve("__dirname", "index.html");
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hostname = '127.0.0.1';
const port = 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use("/anime", (req, res, next) => {
    res.send("izin yok");
});

let animes = [
    {
        id: 1,
        name: 'Naruto',
        rating: 8.6,
    },
    {
        id: 2,
        name: 'Death Note',
        rating: 9.2,
    },
    {
        id: 3,
        name: 'One Piece',
        rating: 9.1,
    },
];

app.use(express.static('public'));
app.use(express.json());

app.get('/api/anime', (req, res) => {
    res.json(animes);
});

app.post('/api/anime', (req, res) => {
    console.log(req.body);
    animes.push(req.body);
    res.json(animes);
});

app.put('/api/anime/:id', (req, res) => {
    const id = parseInt(req.params.id);

    eleman bulunduğunda break ile döngü biter
    for (const [i, e] of animes.entries()) {
        if (e.id === id) {
            animes[i] = {
                ...e,
                ...req.body,
            };
            break;
        }
    }

    res.json(animes);

    {
        her elemanı döndürmek zorunda
        animes = animes.map((anime) => {
            if (anime.id === id) {
                return {
                    ...anime,
                    ...req.body,
                };
            } else return anime;
        });
    }

    {
        /*break çalışmıyor o yüzden tüm elemanları döner
     animes.forEach((e, i) => {
         if (e.id === id) {
             animes[i] = {
                 ...e,
                 ...req.body,
             };
         }
    });
    }
});

app.delete('/api/anime/:id', (req, res) => {
    const id = parseInt(req.params.id);
    for (const [i, e] of animes.entries()) {
        console.log('deneme');
        console.log(i);
        if (e.id === id) {
            animes.splice(i, 1);
            break;
        }
    }
    res.json(animes);
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/list', (req, res) => {
    res.render('list');
});

app.get('/detail', (req, res) => {
    res.render('detail');
});

app.get('/top', (req, res) => {
    res.sendFile(__dirname + '/top.html');
});

app.get('/anime', (req, res) => {
    res.send(animes);
});

app.get('/anime/:animeId', (req, res) => {
    if (req.params.animeId in animes) res.send(animes[`${req.params.animeId}`].name);
    else res.send('bulunamadı');
});

app.listen(port, hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
});
*/
