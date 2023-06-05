import { User } from './users.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  // increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};

export const getLogDateAndTime = (dateString: string): string => {
  const originalFormat: string = dateString;
  const modifiedFormat: string = originalFormat.replace('T', ' ').replace('Z', '');
  const datetimeObj: Date = new Date(modifiedFormat);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDatetime: string = datetimeObj.toLocaleString('en-US', options);
  return formattedDatetime;
};
