// const onSignIn = async (googleUser) => {
//     try {
//         if (!googleUser) {
//             throw new Error('Google user object is undefined');
//         }
//         const token = googleUser.getAuthResponse().id_token;
//         await signInWithServer(token);
//     } catch (error) {
//         console.error('Error during Google Sign In:', error);
//     }
// };
// const signInWithServer = async (token) => {
//     try {
//         const serverResponse = await fetch('/api/auth/googleSignIn', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 token
//             })
//         });
//         handleServerResponse(serverResponse);
//     } catch (error) {
//         console.error('Network error:', error);
//     }
// };
// const handleServerResponse = (serverResponse) => {
//     if (serverResponse.ok) {
//         console.log('Sign in successful');
//         window.location.href = '/tasks';
//     } else {
//         console.error('Sign in failed');
//     }
// };

// function initGoogleSignIn() {
//     gapi.load('auth2', function() {
//         var auth2 = gapi.auth2.init({
//             client_id: '116568495505-3bnm8atka0uvirhu9rf5k4ol631n69a9.apps.googleusercontent.com',
//         });
//         auth2.attachClickHandler('sign-in-button', {},
//             function(googleUser) {
//                 console.log('Google User signed in:', googleUser.getBasicProfile().getName());
//             },
//             function(error) {
//                 console.error('Error signing in:', error);
//             }
//         );
//     });
// }
// window.onload = initGoogleSignIn;