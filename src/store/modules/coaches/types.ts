import Coach from "@/models/Coach";

/*
 * Coaches state types
 */
export interface CoachesState {
  userIsCoach: boolean
  coaches: Coach[];
}

/*
 * Coaches action & mutation types
 */
export interface RegCoachPayload {
  coach: Coach;
}