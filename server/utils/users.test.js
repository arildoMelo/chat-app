const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 'u1',
            name:'User1',
            room:'some room'
        },{
            id: 'u2',
            name:'User2',
            room:'some room'
        },{
            id: 'u3',
            name:'User3',
            room:'some different room'
        }
    ]
    });
    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name:'User',
            room:'some room'
        };

        var resUser = users.adduser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]); 
        expect(resUser).toEqual(user); 
    });

    it('should find user', () => {
        var user = users.getUser('u1');
        expect(user).toEqual({"id": "u1", "name": "User1", "room": "some room"});
    });

    it('should not find user', () => {
        var user = users.getUser('u4');
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should remove a user', () => {
        var usersList = users.removeUser('u1');
        expect(usersList).toEqual({"id": "u1", "name": "User1", "room": "some room"});
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var usersList = users.removeUser('u4');
        expect(usersList).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should return names for some room', () => {
        var userList = users.getUserList('some room');

        expect(userList).toEqual(['User1', 'User2']);
    });

    it('should return names for some different room', () => {
        var userList = users.getUserList('some different room');

        expect(userList).toEqual(['User3']);
    });
})