

const BASE_URL = "http://localhost:8080"


const API_LOGIN_URL = "/api/auth/login"
const API_REGISTER_URL = "/api/auth/register"
const API_MEDICATION_UNITS_URL = "/api/medication-units"


const callLoginApiRequest = (email, password) => {
    const body = {
        email: email,
        password: password
    };

    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}${API_LOGIN_URL}`, params);
};


const callRegisterApiRequest = ({firstname, lastname, email, password}) => {
    const body = {
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname,
    };

    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}${API_REGISTER_URL}`, params);

}

const getMedicationUnits = (token) => {
    const params = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    return fetch(`${BASE_URL}${API_MEDICATION_UNITS_URL}`, params);
}


export {
    callLoginApiRequest,
    callRegisterApiRequest,
    getMedicationUnits
};