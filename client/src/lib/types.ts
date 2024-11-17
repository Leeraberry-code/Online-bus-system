export interface Student {
  Learner_ID: number;
  Learner_Name: string;
  Learner_Surname: string;
  Learner_CellNo: string;
  Learner_Grade: number;
  Bus_ID: number;
  Status: string;
  Admin_ID: number
}

export interface Bus {
  Bus_ID: number;
  Route_ID: number;
  Route_Name: string;
  capacity: number;
  occupied: number;
  PickUp_time: string;
  DropOff_time: string;
  Bus_SpaceStatus: string;
}

export interface Route {
  Route_ID: number;
  PickUp_No: string;
  DropOff_No: string;
  Route_Name: string;
}
