import { Router } from "express";

import { jwtAuth } from "../middlewares/jwtAuth";
const basicAuthRoute = Router();

interface IList {
  id: number;
  description: string;
  done: boolean;
  deadline: Date;
}

let list: IList[] = [
  {
    id: 1,
    description: 'Test',
    done: false,
    deadline: new Date(),
  },
  {
    id: 2,
    description: 'Test 2',
    done: false,
    deadline: new Date(),
  }
];

basicAuthRoute.use(jwtAuth);

basicAuthRoute.get<{ id: string }>('/:id?', (req, res) => {

  const { id } = req.params;

  if(id) {
    return res.json(list.find((todo) => todo.id === Number(id)) || {}); 
  };

  return res.json(list);
});

basicAuthRoute.post<{}, {}, IList>('/', (req, res) => {

  const {
    id = list.length + 1,
    description,
    done = false,
    deadline = new Date(),
  } = req.body;

  list.push({
    id,
    deadline,
    description,
    done,
  });

  res.send(200);
});

basicAuthRoute.patch<{ id: string }, {}, IList>('/:id?', (req, res) => {
  
  const { id } = req.params;

  const data = req.body;
  console.log("desc", data, req.body);

  const oldItem = list.find((item) => item.id === Number(id));

  if(!oldItem) {
    res.sendStatus(404);
    return;
  }

  const items = list.map((item) => {
    if(item.id !== Number(id)) return item

    return {...item, ...data };
  });

  list = items;

  res.send(200);
});

basicAuthRoute.delete<{ id: string }, {}, IList>('/:id?', (req, res) => {
  
  const { id } = req.params;

  const idNumber = Number(id);

  if(!idNumber && isNaN(idNumber)) {
    res.sendStatus(400);
    return;
  }

  const oldItem = list.find(item => item.id === idNumber);

  if(!oldItem) {
    res.sendStatus(404);
    return;
  }

  list = list.filter(item => item.id !== idNumber);

  return res.sendStatus(200);
});


export default basicAuthRoute;