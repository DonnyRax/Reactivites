import { IUser } from "../../models/user";
import { IActivity, IAttendee } from "../../models/activity";

export const combineDateandTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(
      a => a.username.toLowerCase() === user.username.toLowerCase()
    )
    activity.isHost = activity.attendees.some(
      a => a.username.toLowerCase() === user.username.toLowerCase() && a.isHost
    )

    return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}