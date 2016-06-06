/**
 * viewPhoto
 * sends Keen tracking event for photo view
 * @param userId
 * @param postId
 * @param postAuthorId
 */
export const viewPhoto = (userId, postId, postAuthorId) => {
    let eventDetails = {
        user: userId,
        postId: postId,
        postAuthorId: postAuthorId,
        type: 'item',
    }
    _trackKeenEvent(eventDetails, 'views')
}

/**
 * viewProfile
 * sends Keen tracking event for profile view
 * @param userId
 * @param profileUserId
 */
export const viewProfile = (userId, profileUserId) => {
    let eventDetails = {
        user: userId,
        profileUser: profileUserId,
        type: 'user',
    }
    _trackKeenEvent(eventDetails, 'views')
}

/**
 * likePhoto
 * sends Keen tracking event for photo like
 * @param userId
 * @param postId
 */
export const likePhoto = (userId, postId) => {
    let eventDetails = {
        user: userId,
        postId: postId
    }
    _trackKeenEvent(eventDetails, 'like')
}

/**
 * followUser
 * sends Keen tracking event for user follow
 * @param userId
 * @param targetId
 * @param direction
 */
export const followUser = (userId, targetId, direction) => {
    let eventDetails = {
        user: userId,
        targetId: targetId,
        direction: direction,
        directionInt: (direction=='follow') ? 1 : -1
    }
    _trackKeenEvent(eventDetails, 'follow')
}

/**
 * _trackKeenEvent
 * sends Keen tracking event
 * @param eventObject
 * @param collectionName
 * @private
 */
const _trackKeenEvent = (eventObject, collectionName) => {
    var viewEventDefaults = {
        ip_address: "${keen.ip}",
        user_agent: "${keen.user_agent}",
        keen: {
            timestamp: new Date().toISOString(),
            addons: [{
                name: "keen:ip_to_geo",
                input: {
                    ip: "ip_address"
                },
                output: "ip_geo_info"
            }, {
                name: "keen:ua_parser",
                input: {
                    ua_string: "user_agent"
                },
                output: "parsed_user_agent"
            }]
        }
    }
    let merged = Object.assign(viewEventDefaults, eventObject)
    keenClient.addEvent(collectionName, merged, function(err, res) {
        if (err) {
            //console.log(err)
            return;
        }
        //console.log(res)
    })
}
