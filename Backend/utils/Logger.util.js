class Logger {
    constructor() {
      this.levels = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
      };
      
      this.level = process.env.NODE_ENV === 'production' 
        ? this.levels.INFO 
        : this.levels.DEBUG;
    }
  
    formatMessage(level, message) {
      const timestamp = new Date().toISOString();
      return `[${timestamp}] [${level}] ${message}`;
    }
  
    error(message) {
      if (this.level >= this.levels.ERROR) {
        console.error(this.formatMessage('ERROR', message));
      }
    }
  
    warn(message) {
      if (this.level >= this.levels.WARN) {
        console.warn(this.formatMessage('WARN', message));
      }
    }
  
    info(message) {
      if (this.level >= this.levels.INFO) {
        console.info(this.formatMessage('INFO', message));
      }
    }
  
    debug(message) {
      if (this.level >= this.levels.DEBUG) {
        console.debug(this.formatMessage('DEBUG', message));
      }
    }
  
    setLevel(level) {
      if (this.levels[level] !== undefined) {
        this.level = this.levels[level];
      }
    }
  }
  
  module.exports = new Logger();