require("dotenv").config();

import { adjectives, nonces } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

// 사용자 Secret key 생성
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nonces[randomNumber]}`;
};

// 메일 발송
export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "projavaflex@gmail.com",
    to: address,
    subject: "사용자 로그인 Borngram",
    html: `Borngram에 오신걸 환영 합니다. <br/> ${secret} <br/> Key를 복사하여 로그인 하세요.`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
