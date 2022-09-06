### Notes:
=> firebase preview deploy: firebase hosting:channel:deploy <preview_name> --expires 1d

=> firebase offical deploy option 1 (from preview - clone): firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

- SOURCE_SITE_ID and TARGET_SITE_ID: These are the IDs of the Hosting sites that contain the channels.
-- For your default Hosting site, use your Firebase project ID.
-- You can specify sites that are in the same Firebase project or even in different Firebase projects.

- SOURCE_CHANNEL_ID: This is the identifer for the channel that is currently serving the version you want to deploy to your live channel.
-- For a live channel, use live as the channel ID.

EXAMPLE: firebase hosting:clone livethree-d1d85:SOURCE_CHANNEL_ID livethree-d1d85:live

=> firebase offical deploy option 2 (from local): firebase deploy --only hosting

ref: https://firebase.google.com/docs/hosting/multisites?authuser=0&hl=en#set_up_deploy_targets

-----------

<site-id> === livethree-d1d85 || livethree-landing-page

preview template: firebase hosting:channel:deploy <preview-name> --only <site-id> --expires 1d
preview example : firebase hosting:channel:deploy test1 --only livethree-landing-page --expires 1d

deploy template: firebase deploy --only hosting:<site-id>
deploy example: firebase deploy --only hosting:livethree-landing-page

clone = deploy preview to live
clone template: firebase hosting:clone <SOURCE_SITE_ID>:<SOURCE_CHANNEL_ID> <TARGET_SITE_ID>:live (<SOURCE_CHANNEL_ID> may be "live" as well)
clone example: firebase hosting:clone livethree-landing-page:test1 livethree-landing-page:live

firebase hosting:channel:deploy upgrade6 --only livethree-d1d85 --expires 1d

firebase hosting:clone livethree-d1d85:upgrade5 livethree-d1d85:live
------------
firebase hosting:clone livethree-d1d85:live livethree-closed-beta:live

localhost will run .env.development secrets [yarn start]
production will run .env.production secrets [yarn run build]
ref: https://stackoverflow.com/questions/42458434/how-to-set-build-env-variables-when-running-create-react-app-build-script#:~:text=npm%20start%20will%20set%20REACT_APP_NODE_ENV,env.



### Before close beta

- connect wallet

test
### during closed beta
- upgrade Alchemy so dont hit limit (have buffer - check daily!!)
- upgrade 100ms so dont hit limit (wait meeting tonight)
- upgrade Web3Auth so dont hit limit (pay by invoice)

- apply SF grant (in progress Reactor or WavePool)
- apply polygon grant (meh, need 500 twitter follower)
- apply 100ms grant? (startup got special starting rates)

### Enhancements - must haves
- do testing driven development when rework the livethree app | https://www.youtube.com/watch?v=04BBgg8zgWo&ab_channel=LaithAcademy | https://www.youtube.com/results?search_query=react+testing
- make if suddenly network(chain) for some reason, pending call or active call is cleared properly
- FORGOT PASSWORD at sign in page
- CallsPage.tsx history uses OLD data, how to sync in map?
- do a "in the works"/"coming soon" features such as screen share / live streaming 
- proper receipt (how much spent) in historic calls
- todo reduce cost, can we get useDocument data from useCollection? (Call.tsx using both, manybe can only use one)
- FIRESTORE RULES - history - see TODO in Could Firestore Tab's Rules Tab
- prettify auth verification & password reset WEBSITE
- handle blocked popup (if got any case)
- enforce app check for firestore, storage, cloud function | https://www.youtube.com/watch?v=DEV372Kof0g
- screen share
- interactive live streaming
- proper typescript
- vite (instead of CRA - create-react-app): https://vitejs.dev/ (vs Next.js?)
- best practices for firebase Auth & Firestore (ignore the class instead of hooks): https://www.youtube.com/watch?v=knk5Fjrpde0&ab_channel=Firebase
- use-react-forms + mui: https://react-hook-form.com/  ||  https://github.com/dohomi/react-hook-form-mui
- use react-query for firebase stuff and others, one down side of the current react-firebase-hooks is that cannot control the state of error and cost
- make can delete active stream as recipient as well (not only sender - current)
- handle cookies, apparently LiveThree uses cookies unknowingly (more than just from web3auth)

- use server-side listener to listen when peer exit room, then trigger end [CFA money stream, delete firebase firestore & delete 100ms room (if need)]
(listen to what to initate end trigger?: 100ms's webhook? how to implement this?) ref: https://www.100ms.live/docs/server-side/v2/foundation/webhook
ref:
we don't have any short term plans for this(and it's quite difficult to do it in generic way, there are a lot of web server frameworks), but I can defintiely point you in the right direction.
Webhooks are only about setting up an api server, if you want to go with Python the easiest way to do this is using Flask. Here is a simple blog demonstrating this - https://www.realpythonproject.com/intro-to-webhooks-with-and-how-to-receive-them-with-python/
For just seeing how the webhooks responses will look like you can use this site - https://webhook.site/ to get a webhook url and put in dashboard's developer section, the UI will then show all the incoming webhooks.
Possible to webhooks for SPAs? to consider revamp version of app.livethree.xyz | OR | if say use Next.js part server style and deploy to hosting, auto have a server to "listen"?

resources for webhook to close money stream:
1. webhooks 101: https://www.youtube.com/watch?v=41NOoEz3Tzc&ab_channel=freeCodeCamp.org | https://github.com/TwilioDevEd/webhooks-course/blob/main/code/express-discorder/server.js
2. webhooks in firebase cloud fn: https://firebase.google.com/docs/functions
3. use reason: https://www.100ms.live/docs/server-side/v2/foundation/webhook#peer-leave-success
(for 3.) how to distinguish between normal "end call" vs "non-explicit end call" such as window closed / pc shutdown, also, prevent double deleteFlow fn call. - ANS: use peer.leave.success unexpected reason (must test): https://www.100ms.live/docs/server-side/v2/foundation/webhook#peer-leave-success

- logo guide: https://logosbynick.com/logo-files-for-clients/

### Enhancements - good to consider
- better user search functionality (eg search by username) -- in Favourites Page
- missed calls section? - expensive in db
- list of active flows. use subgraph or db
- if hms room or money stream suddenly ends, end the call, execute
-- primary - client side
-- secondary - server side (backup)
- on/off -ramp service
- sign up - terms of service, write the service (maybe need add scroll functionality)
- translation to USD (from DAIx or USDCx)
- captcha for sign in / sign up (before upload pic)
// https://www.npmjs.com/package/react-google-recaptcha
// https://levelup.gitconnected.com/how-to-implement-recaptcha-in-a-react-application-6098c506d750

- LiveThree doesn't use cookkies: https://softwareengineering.stackexchange.com/a/295212

require register
https://www.google.com/recaptcha/admin/create



/// old firestore rules ///

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
 		// ref: https://stackoverflow.com/a/59892127/19776131
    match /users/{userId} {
      allow read: if isLoggedIn() && isVerified();
      
      // TODO: in future enhance, make sign-up only with email, and can only create/write other data if verified email
      allow create: if 
      		 isLoggedIn() 
        && isValidUserFields()
        && !exists(/databases/$(database)/documents/users/$(userId))
        ;

      allow update: if 
      		 isLoggedIn()
        && isVerified()
      	&& isOwner(userId)
      	&& isNotUpdatingField(['address']) // only set once at creation
      	&& ((isValidUserFields() && isNotUpdatingField(['handle'])) || isUniqueAndValidHandle(userId))
        ;
    }
    
    match /handle/{handleValue} {
      allow read: if isLoggedIn() && isVerified();

      allow create: if isLoggedIn() && isVerified() &&
      	getUserAfter(incomingData().value).data.handle == handleValue;
        // getUserAfter(getHandleAfter(/users/username/$(username)).data.value).data.username == username;

      allow delete: if isLoggedIn() && isVerified() &&
        !userExistsAfter(existingData().value)
        || getUserAfter(existingData().value).data.handle != handleValue
        || !('handle' in getUserAfter(existingData().value).data)
        ; // existingData().value replaced getHandleBefore(/users/username/$(username)).data.value 
    }
    match /history/{document=**} {
    	allow read: if 
      		 isLoggedIn()
        && isVerified()
        // && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.address == address 
        // note: comment out line as not critical, so save cost?, and can read history on chain anyway
        ;
      
      allow create: if 
      		 isLoggedIn()
        && isVerified()
        ; // TODO: how to make creating this more secure?
    }
		// match /history/{document=**} {
		//  allow read, write;
		// }
    match /rooms/{document=**} {
    	allow read: if 
      		 isLoggedIn()
        && isVerified()
        ;
      
      allow write: if 
      	 	  isLoggedIn()
         && isVerified()
         ;
		}
    match /callerHasRoom/{document=**} {
    	allow read: if 
      		 isLoggedIn()
        && isVerified()
        ;
      
      allow write: if 
      	 	  isLoggedIn()
         && isVerified()
         ;
    }
    match /referrals/{userId} {
    	allow read: if 
      		 isLoggedIn()
        && isVerified()
        ;
      
      allow create: if true;
      allow delete: if 
      		 isLoggedIn()
        && isVerified()
        && isOwner(userId)
        ; 
    }
    match /promo1/{referrerAddress} {
    	allow read: if 
      		 isLoggedIn()
        && isVerified()
        ;
      
      allow create: if 
      		 isLoggedIn()
        && isVerified()
        && get(/databases/$(database)/documents/referrals/$(request.auth.uid)).data.referrerAddress == referrerAddress
        // && !exists(/databases/$(database)/documents/promo1/$(referrerAddress))
        ;
      allow update: if 
      		 isLoggedIn()
        && isVerified()
        && incomingData().count >= 0
        &&
        (( // referrer
        	 // get(/databases/$(database)/documents/users/$(request.auth.uid)).data.address == referrerAddress
        	 existingData().count > 0
        && incomingData().count == existingData().count - 1
        )
        || 
        (  // referee
        	 get(/databases/$(database)/documents/referrals/$(request.auth.uid)).data.referrerAddress == referrerAddress
        && incomingData().count == existingData().count + 5
        ))
        ;
    }
    
    // ---------------------- //
    // -- helper functions -- //
    // ---------------------- //
    
    function isLoggedIn() {
      return request.auth != null;
    }
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    function isVerified() {
    	return request.auth.token.email_verified;
    }
    function existingData() {
    	return resource.data
    }
    function incomingData() { // incomingData name is a bit misleading, its more like data in db after write operation
    	return request.resource.data
    }
    function isValidUserFields() {
    	return (
      		// // isNotUpdatingField(['handle']) // make sure no change to handle
      	//    incomingData().firstName.size() >= 2
      	// && incomingData().firstName.size() <= 30
      	// && incomingData().lastName.size() >= 2
      	// && incomingData().lastName.size() <= 30
      	// && incomingData().displayName.size() >= 3
      	// && incomingData().displayName.size() <= 50
      		 incomingData().headline.size() <= 200
      	&& incomingData().about.size() <= 1000
      	&& incomingData().description.size() <= 1000
      );
    }
    function isUniqueAndValidHandle(userId) {
    	return (
        isNotUpdatingField(['headline', 
        										'about', 
        										'description',
                            ])
        &&
        (( // update
        isValidHandle(incomingData().handle)
        && !handleExistsBefore(/$(incomingData().handle))
        && getHandleAfter(/$(incomingData().handle)).data.value == userId
        ) // incomingData().username replaced getUserAfter(userId).data.username
        ||
        ( // delete
        handleExistsBefore(/$(existingData().handle))
        && !handleExistsAfter(/$(existingData().handle))
        && !('handle' in incomingData())
        )) // existingData().username replaced getUserBefore(userId).data.username
      );
    }
    function getHandleAfter(path) {
      return getAfter(/databases/$(database)/documents/handle/$(path))
    }
    // function getHandleBefore(path) {
    //   return get(/databases/$(database)/documents/handle/$(path))
    // }
    function handleExistsAfter(path) {
      return existsAfter(/databases/$(database)/documents/handle/$(path))
    }
    function handleExistsBefore(path) {
      return exists(/databases/$(database)/documents/handle/$(path))
    }
    function getUserAfter(id) {
      return getAfter(/databases/$(database)/documents/users/$(id))
    }
    // function getUserBefore(id) {
    //   return get(/databases/$(database)/documents/users/$(id))
    // }
    function userExistsAfter(id) {
      return existsAfter(/databases/$(database)/documents/users/$(id))
    } 
    function isNotUpdatingField(fields) {
    	return !incomingData().diff(existingData()).affectedKeys().hasAny(fields);
    } // ref: https://stackoverflow.com/a/73101314/19776131
    function isValidCharacters(handle) {
    	return handle.matches('^([a-z0-9_]){1,15}$');
    } // ref: https://stackoverflow.com/a/52010461/19776131
    function isValidLength(handle) {
    	return handle.size() >= 2 && handle.size() <= 15;
    }
    function hasNoSpecialWords(handle) {
    	return (
      		 !handle.matches('.*(admin).*')
        && !handle.matches('.*(livethree).*')
        && !handle.matches('.*(live3).*')
        // && !handle.matches('.*(live_three).*')
        // && !handle.matches('.*(live__three).*')
        // && !handle.matches('.*(live___three).*')
        // && !handle.matches('.*(live____three).*')
        // && !handle.matches('.*(live_____three).*')
        // && !handle.matches('.*(live_______three).*')
        );
    } // ref: https://stackoverflow.com/a/63653865/19776131
    function isValidHandle(handle) {
    	return isValidCharacters(handle) && isValidLength(handle) && hasNoSpecialWords(handle); // 
    }
    
  }
}