import mongoose from "mongoose";

const conenctDB = async () => {
  await mongoose
        .connect(`${process.env.MONGO_URL}/real-state`)
        .then(() => {
            console.log("DB Connected Successfully!");
        })
        .catch((err) => {
            console.log(err);
        });
};

export default conenctDB;
