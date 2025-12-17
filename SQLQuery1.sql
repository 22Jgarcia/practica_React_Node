
create database miniTaskdb;


CREATE	table users(
	id int identity(1, 1) primary key,
	username nvarchar(50) not null,
	password_hash nvarchar(255) not null,
	create_at datetime default getdate(),
);

create table task(
	id int identity(1, 1) primary key,
	user_id int not null,
	title nvarchar(100) not null,
	description nvarchar(255),
	status nvarchar(20) default 'pendiente',
	create_at datetime default getdate(),
	foreign key (user_id) REFERENCES users(id),
);




USE [miniTaskdb]
GO

INSERT INTO [dbo].[users]
           ([username]
           ,[password_hash]
           )
     VALUES
           (
		   'julio',
		   123456
		   );

INSERT INTO [dbo].[task]
           ([user_id]
           ,[title]
           ,[description]
           ,[status]
           )
     VALUES
           (1,
			'comprar cafe',
			'para poder programar',
			'pendiente'
			),
			(
			1,
			 'leer documentacion',
			 'express y react',
			 'hecho'
			);

select * from users;
select * from task;

select username,
	   status		
from users
inner join task on users.id= task.user_id;
	
