import xss from 'xss';

export const xssPrevention = (resolve, parent, args, context, info) => {
  if (args && args.data) {
    for (const [key, value] of Object.entries(args.data)) {
      if (typeof value !== 'string') continue;
      args.data[key] = xss(value);
    }
  }
  return resolve(parent, args, context, info);
};
