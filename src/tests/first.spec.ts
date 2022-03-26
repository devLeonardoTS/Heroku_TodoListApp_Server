import { UserAccountCreationValidatableData } from "../validators/users/account/UserAccountCreationValidatableData";

describe("UserAccountCreationValidatableData", () => {

    let validatableData: UserAccountCreationValidatableData;

    beforeAll(() => {
        const dataSentByUser: Object = {
            username: "Johnny",
            password: "As3cUr3P422w0rd"
        }

        validatableData = new UserAccountCreationValidatableData(dataSentByUser);
    });

    it("Should contain sent value for username.", () => {
        expect(validatableData.getFieldValue("username")).toBe("Johnny");
    });

    it("Should contain sent value for password.", () => {
        expect(validatableData.getFieldValue("password")).toBe("As3cUr3P422w0rd")
    });

});