import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabase';

const dbConnect = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log(`\x1b[32m[MongoDB] Connected to ${mongoURI}\x1b[0m`);
        })
        .catch(err => {
            console.error('\x1b[31m[MongoDB] Connection Error:', err.message, '\x1b[0m');
            process.exit(1);
        });
};

export default dbConnect;
