import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name Must Contain at least 3 characters!"],
        maxLength: [30, "Jitna Bola Utna hi Likh!"],
    },
    email:{
        type: String,
        require: [true, "Please provide your email!"],
        validate: [validator.isEmail, "@gmail.com Bhi likh bhai!"],
    },
    phone:{
        type: Number,
        required: [true, "Phone Number daal Bhai."],
    },
    password:{
        type: String,
        required: [true, "Password Daal Bhai!"],
        minLength:[8, "kam Se kam 8 Characters!"],
        maxLength: [32, "32 se jyada nahi chalega!"],
        select: false
    },
    role:{
        type: String,
        required: [true, "kaun Hai Tu"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


//Hashing the password
//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);