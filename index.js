// npm init -y
// npm i express
require("dotenv").config();
const express = require('express');

//mongoose conncetion {{AFTER}}
const connectDB = require("./connection");

const foodModel = require("./users");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const bodyParser = require("body-parser");
const e = require("express");
app.use(bodyParser.json());

// route:      /
// desc:       to get all user
// parameter:  none
app.get("/", async (req, res) => {

    try {
        // res.send("Welcome to Homepage.");

        const user = await foodModel.find();
        return res.json({ user });
    } catch (error) {
        console.log("Error => ", error);
    }

});

// route:      /user/new
// desc:       to add a user
// parameter:  none
// app.post("/user/new", async (req, res) => {
//     try {
//         // return res.json(req.params);

//         const { newUser } = req.body;
//         await userModel.create(newUser);
//         return res.json({ message: "user Created" });
//     } catch (error) {
//         console.log("Error => ", error);
//     }
// });

app.post("/user/new", async (req, res) => {
    try {
        // return res.json(req.params);

        const newUser = {
            orderID: req.body.uniqueID,
            foodType: req.body.pizzzaType,
            foodSize: req.body.pizzaSize,
            foodQty: req.body.pizzaQty,
            Maild: req.body.userMail
        }
        // const { newUser } = req.body;
        await foodModel.create(newUser);
        console.log("Food added to db");
        return res.json({ message: "user Created" });
    } catch (error) {
        console.log("Error => ", error);
    }
});

// app.post("/user/new", async (req, res) => {
//     console.log(req.body);
//     console.log(req.body.pizzzaType);
//     res.end();
// });

// route:      /user/:id
// desc:       to get a user by specific id
// parameter:  _id
// app.get("/user/:id", async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const user = await userModel.findById(_id);
//         if (!user) {
//             return res.json({ message: "no user found by id" });
//         }
//         return res.json({ user });
//     } catch (error) {
//         console.log("Error => ", error);
//     }

// })

app.get("/user/find/:id", async (req, res) => {
    try {
        const orderID = req.params.id;
        // console.log("----------------------------------------------1-------");
        // console.log(req.params);
        const food = await foodModel.findOne({ orderID });
        // console.log("----------------------------------------------2-------");
        // console.log(food);
        if (!food) {
            console.log("no food found by id");
            return res.json({ message: "no food found by id" });
        }

        return res.json(food);

    } catch (error) {
        console.log("Error => ", error);
    }

})

// app.get("/user/:id", async (req, res) => {
//     console.log(req.body);

//     res.end();
// });




// route:      /user/type/:type
// desc:       to get a user by type
// parameter:  type
// app.get("/user/type/:type", async (req, res) => {
//     try {
//         const { type } = req.params;
//         const user = await foodModel.find({ userType: type });
//         if (!user) {
//             return res.json({ message: "no user found" });
//         }
//         return res.json({ user });
//     } catch (error) {
//         console.log("Error => ", error);
//     }

// });

// route:      /user/update/:_id
// desc:       to update a user by _id
// parameter:  _id
// app.put("/user/update/:_id", async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const { userData } = req.body;
//         const updateUser = await foodModel.findByIdAndUpdate(
//             _id,
//             { $set: userData },
//             { new: true }
//         );

//         return res.json({ user: updateUser });
//     } catch (error) {
//         console.log("Error => ", error);
//     }

// });

// route:      /user/delete/:_id
// desc:       to delete a user by _id
// parameter:  _id
app.delete('/user/delete/:Oid', async (req, res) => {


    try {
        const { Oid } = req.params;
        const deleteFood = await foodModel.findOneAndDelete({orderID: Oid});
        console.log("DeleteFood.............",deleteFood);
        if (deleteFood) {
            return res.status(200).json({"message": "Order Deleted successfully"})
            
        } 
        return res.status(400).json({"error": "Invalid Id"})
        
    } catch (error) {
        res.status(400).json({"error": error})
    }


});

// route:      /user/delete/type/:userType
// desc:       to delete a user by _id
// parameter:  _id
// app.delete("/user/delete/type/:userType", async (req, res) => {
//     try {
//         const { userType } = req.params;

//         await foodModel.findOneAndDelete({ userType });

//         return res.json({ "message": "User Deleted.." });
//     } catch (error) {
//         console.log("Error => ", error);
//     }

// });


app.listen(port, () =>
    connectDB()
        .then((data) => console.log(`Listeningggggggggggggg to the port no: ${port} and Database connected.`))
        .catch((error) => console.log(error))
);

// node '.\A1_GET&POST.js'  
// npm i mongoose

// Setup all process in ATLAS by:--
// makikng cluster
// database access
// network access

// make ".env" file
// In ATLAS click on: connect > connect your application > copy the URl and paste it in ".env" file and change password and database name.

// A2_Connecting ATLAST

// npm i dotenv 
// add this at top: [ require("dotenv").config(); ]

// make "connection.js" file
// add mongoose connection here