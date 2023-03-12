import faker from 'faker';
import { join } from 'path';

import User from '../models/User';
import Message from '../models/Message';
import Reciept from '../models/Reciept';
import { deleteAllAvatars } from './utils';
import { IMAGES_FOLDER_PATH } from './constants';

export const seedDb = async () => {
  console.log('Seeding database...');

  await User.deleteMany({});
  await Message.deleteMany({});
  await Reciept.deleteMany({});
  await deleteAllAvatars(join(__dirname, '../..', IMAGES_FOLDER_PATH));

  // create 3 users
  const usersPromises = [...Array(3).keys()].map((index, i) => {
    const user = new User({
      provider: 'email',
      username: `user${index}`,
      email: `email${index}@email.com`,
      password: '123456789',
      name: faker.name.findName(),
      // avatar: faker.image.avatar(),
      avatar: `avatar${index}.jpg`,
      bio: faker.lorem.sentences(3),
    });

    if (index === 0) {
      user.role = 'ADMIN';
    }
    user.registerUser(user, () => {});

    return user;
  });

  await Promise.all(
    usersPromises.map(async (user) => {
      await user.save();
    }),
  );

  // create 9 messages
  const messagePromises = [...Array(9).keys()].map((index, i) => {
    const message = new Message({
      text: faker.lorem.sentences(3),
    });
    return message;
  });

  await Promise.all(
    messagePromises.map(async (message) => {
      await message.save();
    }),
  );

  // create 9 messages
  const recieptPromises = [...Array(2).keys()].map((index, i) => {
    const reciept = new Reciept({
      customerName: "테스트거래처"+i,
      manager: "테스트관리자",
      contact: "테스트연락처",
      productName: "테스트제품명",
      standard: "테스트기준",
      quantity: "테스트수량",
      dueDate: Date.now(),
      bowNumber: "테스트절수",
      memo1: "테스트 중요메모",
      memo2: "테스트 주문메모",
      bindingMethod: "테스트 제본 방법",
      gwidori: "테스트 귀도리",
      ribbon: "테스트 리본",
      gildEdge: "테스트 금장",
      shrinkWrap: "테스트 포장",
      ct: "테스트 ct",
      barcode: Math.random().toString(36).substring(2, 11),
      composition: [
        {
          description: "면지",
          paper: "테스트 용지",
          page: 7,
          memo: "테스트 비고"
        },
        {
          description: "화보",
          paper: "테스트 화보",
          page: 40,
          memo: "테스트 비고"
        },
        {
          description: "본문",
          paper: "테스트 본문",
          page: 150,
          memo: "테스트 비고"
        },
      ],
      currentProcess: 4,
      processType: ['재단','접지','노리','정합','사철','가다미','삼면재단','성책','후가공1','후가공2','후가공3'],
    });
    return reciept;
  });

  await Promise.all(
    recieptPromises.map(async (reciept) => {
      await reciept.save();
    }),
  );

  const users = await User.find();
  const messages = await Message.find();
  const reciepts = await Reciept.find();

  // every user 3 messages
  users.map(async (user, index) => {
    const threeMessagesIds = messages.slice(index * 3, index * 3 + 3).map((m) => m.id);
    await User.updateOne({ _id: user.id }, { $push: { messages: threeMessagesIds } });
  });

  // 0,1,2 message belong to user 0 ...
  messages.map(async (message, index) => {
    const j = Math.floor(index / 3);
    const user = users[j];
    await Message.updateOne(
      { _id: message.id },
      {
        $set: {
          user: user.id,
        },
      },
    );
  });

  // 0,1,2 message belong to user 0 ...
  reciepts.map(async (reciept, index) => {
    const j = Math.floor(index / 3);
    const user = users[j];
    await Reciept.updateOne(
      { _id: reciept.id },
      {
        $set: {
          user: user.id,
        },
      },
    );
  });
};
