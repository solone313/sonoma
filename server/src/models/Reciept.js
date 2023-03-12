import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const recieptSchema = new Schema(
  {
    // 거래처명
    customerName: {
      type: String,
      required: true,
    },
    // 담당자
    manager: {
        type: String,
    },
    // 연락처
    contact: {
        type: String,
    },
    // 제품명
    productName: {
        type: String,
    },
    // 규격
    standard: {
        type: String,
    },
    // 수량
    quantity: {
        type: String,
    },
    // 납기일
    dueDate: {
        type: Date,
    },
    // 절수
    bowNumber: {
        type: String,
    },
    // 중요메모
    memo1: {
        type: String,
    },
    // 주문메모
    memo2: {
        type: String,
    },
    // 제본방법
    bindingMethod: {
        type: String,
    },
    // 귀도리
    gwidori: {
        type: String,
    },
    // 시오리/리본
    ribbon: {
        type: String,
    },
    // 금장
    gildEdge: {
        type: String,
    },
    // 포장
    shrinkWrap: {
        type: String,
    },
    // C/T
    ct: {
        type: String,
    },
    // 바코드
    barcode: {
        type: String,
    },
    // 내지 구성
    composition: [{
        // 내용
        description: String,
        // 용지
        paper: String,
        // 페이지
        page:  Number,
        // 비고
        memo: String,
    }],
    // 현재 공정
    currentProcess: {
        type: Number,
       
    },
    // 공정과정
    processType: [{
        type: String,
        enum : ['재단','접지','노리','정합','사철','가다미','삼면재단','성책','후가공1','후가공2','후가공3'],
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

recieptSchema.methods.toJSON = function () {
  return {
    id: this._id,
    customerName: this.customerName,
    manager: this.manager,
    contact: this.contact,
    productName: this.productName,
    standard: this.standard,
    quantity: this.quantity,
    dueDate: this.dueDate,
    bowNumber: this.bowNumber,
    memo1: this.memo1,
    memo2: this.memo2,
    bindingMethod: this.bindingMethod,
    gwidori: this.gwidori,
    ribbon: this.ribbon,
    gildEdge: this.gildEdge,
    shrinkWrap: this.shrinkWrap,
    ct: this.ct,
    barcode: this.barcode,
    composition: this.composition,
    currentProcess: this.currentProcess,
    processType: this.processType,
    createdAt: this.createdAt.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }),
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

const Reciept = mongoose.model('Reciept', recieptSchema);

export default Reciept;
