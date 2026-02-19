import nodemailer from 'nodemailer';

const transpoter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user : 'manojrawat87634@gmail.com',
        pass : "rqpwnccumknluloh"
    }
});

export default transpoter;