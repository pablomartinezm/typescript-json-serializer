import { JsonProperty, Serializable } from '../../src';

import { Animal } from './animal';
import { Employee } from './employee';
import { Panther } from './panther';
import { Snake } from './snake';
import { UnknownAnimal } from './unknown-animal';
import { PhoneNumber } from './phone-number';

const snakeOrPanther = (animal: any) => {
    return animal && animal['isPoisonous'] !== undefined ? Snake : Panther;
};

const coordinatesToArray = (coordinates: { x: number; y: number; z: number }) => {
    return Object.values(coordinates);
};

const arrayToCoordinates = (array: Array<number>) => {
    return {
        x: array[0],
        y: array[1],
        z: array[2]
    };
};

@Serializable()
export class Zoo {
    @JsonProperty()
    boss: Employee;
    @JsonProperty()
    city: string;
    @JsonProperty()
    country: string;
    @JsonProperty({ onDeserialize: arrayToCoordinates, onSerialize: coordinatesToArray })
    coordinates: { x: number; y: number; z: number };
    @JsonProperty()
    description: string;
    @JsonProperty({ type: Employee })
    employees: Array<Employee>;
    @JsonProperty()
    id: number;
    @JsonProperty()
    name: string;
    @JsonProperty({ name: 'Animals', predicate: snakeOrPanther })
    animals: Array<Animal>;
    @JsonProperty({ predicate: snakeOrPanther })
    mascot: Panther | Snake;
    @JsonProperty()
    bestEmployeeOfTheMonth: Employee;
    @JsonProperty({ type: UnknownAnimal })
    unknownAnimals: Array<UnknownAnimal>;
    @JsonProperty({ isDictionary: true })
    phoneBook: { [id: string]: PhoneNumber };

    isOpen = true;

    constructor() {}
}
