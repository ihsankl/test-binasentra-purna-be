const mongoose = require('mongoose');


const main = async () => {
    try {
        const x = await mongoose.connect('mongodb+srv://admin:admin@asuransi-kebakaran.wtor9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true');
        if (x) console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

main();