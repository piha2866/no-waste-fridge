import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Note } from '../backend/db/types';
import { StackParamList } from '../navigation/AppNavigator';

export type DetailsScreenRouteProp = NativeStackScreenProps<StackParamList, 'Details'>;

export interface DetailsScreenRouteProps {
  route: DetailsScreenRouteProp;
}

export interface DetailsScreenProps {
  note?: Note;
}
