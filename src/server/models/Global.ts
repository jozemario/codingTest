// Declare a type.
export default interface CustomNodeJsGlobal extends NodeJS.Global {
  SocketUsers: any[];
  WServices: any[];
  INQueue: any[];
  OUTQueue: any[];
  DONEQueue: any[];
  // You can declare anything you need.
}