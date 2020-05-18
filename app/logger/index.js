import winston from 'winston';

const loggerOptions = {
  console: {
    colored: true,
    json: false,
    level: 'debug',
    handleExcpetions: true,
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'server' }),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({
      level, message, label, timestamp,
    }) => `(${timestamp}) [${label}:${level}] ${message}`),
  ),
  transports: [
    new winston.transports.Console(loggerOptions.console),
  ],
});

export default logger;
