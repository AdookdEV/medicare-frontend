import {LOGIN_URL} from "./url.js";

const BASE_URL = "http://localhost:8080"

const API_LOGIN_URL = "/api/auth/login"
const API_REGISTER_URL = "/api/auth/register"
const API_MEDICATION_UNITS_URL = "/api/medication-units"
const API_MEDICATION_REMIND_URL = "/api/medication-reminder"
const API_BASE_URL = `${BASE_URL}/api`;



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

const saveMedicationRemind = (token, body) => {
    const params = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body),
    }
    return fetch(`${BASE_URL}${API_MEDICATION_REMIND_URL}`, params);
}

const getMedicationReminders = (token) => {
    const params = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    return fetch(`${BASE_URL}${API_MEDICATION_REMIND_URL}`, params);
}

const deleteMedicationReminder = (token, id) => {
    const params = {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    return fetch(`${BASE_URL}${API_MEDICATION_REMIND_URL}/${id}`, params);
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");
    return { Authorization: `Bearer ${token}` };
};

// Fetch doctors
export const fetchDoctors = async () => {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
        headers: { ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Failed to fetch doctors");
    return response.json();
};

// Create a new doctor
export const createDoctor = async (doctorData, navigate) => {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(doctorData),
    });
    if (response.status === 401) {
        navigate(LOGIN_URL);
        return;
    }
    if (!response.ok) throw new Error("Failed to create doctor");
    return response.json();
};

// Delete a doctor
export const deleteDoctor = async (doctorId) => {
    const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Failed to delete doctor");
};

// Create a new appointment
export const createAppointment = async (doctorId, appointmentData) => {
    console.log(appointmentData);
    const response = await fetch(`${API_BASE_URL}/appointments/doctor/${doctorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(appointmentData),
    });
    if (!response.ok) throw new Error("Failed to create appointment");
    return response.json();
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() },
    });
    if (!response.ok) throw new Error("Failed to delete appointment");
};


export {
    callLoginApiRequest,
    callRegisterApiRequest,
    getMedicationUnits,
    saveMedicationRemind,
    getMedicationReminders,
    deleteMedicationReminder

};