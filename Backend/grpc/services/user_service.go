package services

import (
	"context"

	"grpc/configs"
	pb "grpc/proto"
)

var db = configs.NewDBHandler()

type UserServiceServer struct {
	pb.UnimplementedUserServiceServer
}

func (service *UserServiceServer) UpdateUser(ctx context.Context, req *pb.UpdateUserRequest) (*pb.UpdateUserResponse, error) {
	newUser := configs.User{Name: req.Name, Email: req.Email, Diamond: req.Diamond, Avatar: req.Avatar}

	newUser.Diamond++
	_, err := db.UpdateUser(int64(req.Id), newUser)

	if err != nil {
		return nil, err
	}

	return &pb.UpdateUserResponse{Data: "User updated successfully!"}, nil
}
