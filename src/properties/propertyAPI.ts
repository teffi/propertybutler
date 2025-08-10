import { Property } from "./Property";


// import { Property } from './Property';
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}



function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToModels(data: any[]): Property[] {
  let projects: Property[] = data.map(convertToModel);
  return projects;
}

function convertToModel(item: any): Property {
  return new Property(item);
}

const projectAPI = {
  get(page = 1, limit = 10) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },

  put(property: Property) {
    return fetch(`${url}/${property.id}`, {
      method: 'PUT',
      body: JSON.stringify(property),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      })
  },

  async find(id: number) {
    const response = await fetch(`${url}/${id}`);
    const status = await checkStatus(response);
    const item = await parseJSON(status);
    return convertToModel(item);
  }
};

export { projectAPI };