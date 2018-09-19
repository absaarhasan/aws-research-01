export const API_CONFIG = {
    name : "API_GATEWAY",
    path : "/prod/tasks"
};

export const API_URL = 'https://52blbb3op7.execute-api.eu-west-2.amazonaws.com/prod/tasks';

export const AWS_AMPLIFY_CONFIG = {

    Auth: {
        identityPoolId: 'eu-west-2:536b29c4-284f-4fc7-aa62-c88269df6bb1',
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_n3l4pniHn',
        userPoolWebClientId: '4m7ebae9f005pugpd8k8er5p1r'
    },
    API: {
        endpoints: [
            {
                name: "API_GATEWAY",
                endpoint: "https://52blbb3op7.execute-api.eu-west-2.amazonaws.com",
                region: 'eu-west-2'
            }
        ]
    }

}