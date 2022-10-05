import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { userController } from "../modules/accounts/useCases/User";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

usersRoutes.get("/", (request, response) => {
  userController.handleListAllUsers(request, response)
});

usersRoutes.get("/:email", (request, response) => {
  userController.handleFindByEmail(request, response)
})

usersRoutes.post("/", (request, response) => {
  userController.handle(request, response)
});

usersRoutes.put("/:id", (request, response) => {
  userController.handleUpdateUser(request, response)
});

usersRoutes.patch("/:id", uploadAvatar.single("avatar"), (request, response) => {
  userController.handleUpdateUserAvatar(request, response)
});

export { usersRoutes };