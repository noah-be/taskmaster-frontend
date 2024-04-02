import AuthController from '../../src/controllers/AuthController';
import {
    createUser
} from '../../src/utils/userUtils';
import {
    finalizeAuthentication
} from '../../src/utils/authUtils';
import Task from '../../src/models/TaskModel';
import {
    exampleTasks
} from '../../src/utils/exampleTasks';

jest.mock('../../src/utils/userUtils', () => ({
    createUser: jest.fn(),
}));
jest.mock('../../src/utils/authUtils', () => ({
    finalizeAuthentication: jest.fn()
}));
jest.mock('../../src/models/TaskModel', () => ({
    insertMany: jest.fn(),
}));

describe('AuthController', () => {
    describe('register', () => {
        it('should create a user and assign example tasks', async () => {
            const mockUser = {
                _id: '123',
                username: 'newUser'
            };
            const mockRedirectUrl = '/tasks';
            const req = {
                body: {
                    username: 'newUser',
                    password: 'password'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            createUser.mockResolvedValue(mockUser);
            Task.insertMany.mockResolvedValue(true);
            finalizeAuthentication.mockResolvedValue({
                redirectUrl: mockRedirectUrl
            });

            await AuthController.register(req, res, next);

            expect(createUser).toHaveBeenCalledWith('newUser', 'password');
            expect(Task.insertMany).toHaveBeenCalledWith(exampleTasks.map(task => ({
                ...task,
                user: mockUser._id
            })));
            expect(finalizeAuthentication).toHaveBeenCalledWith(res, mockUser._id);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User registered successfully',
                userId: mockUser._id,
                redirectUrl: mockRedirectUrl
            });
        });
    });
});