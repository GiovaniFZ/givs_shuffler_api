import packageJson from './package.json'

export const welcomeHTML = `
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giv's Shuffler API</title>
</head>
<body>
    <h1>Welcome to Giv's Shuffler API!</h1>
    <p>This API is meant to be used with my project, Giv's Shuffler!</p>
    <p>Version: ${packageJson.version}</p>
</body>
</html>
`;