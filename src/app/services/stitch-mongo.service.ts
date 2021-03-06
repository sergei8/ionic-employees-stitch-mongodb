import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, AnonymousCredential, StitchAppClient, RemoteMongoDatabase} from 'mongodb-stitch-browser-sdk';

@Injectable({
  providedIn: 'root'
})
export class StitchMongoService {

  client: StitchAppClient;
  db: RemoteMongoDatabase;

  fakeEmployees = [
    {employee_name: 'Adrián Brito Pacheco', job_position: 'Project Manager', avatar: 'http://i.pravatar.cc/150?img=7',
     description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, eu auctor convallis ultrices volutpat himenaeos',
     owner_id: '5bbdcc24698a67d75541832d', phone: '123456789', email: 'fakeemail@gmail.com', department: 'Technical',
    projects: [{name: 'Project Technical 1', description: 'Description 1', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''},
    {name: 'Project Technical 2', description: 'Description 2', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''},
    {name: 'Project Marketing 1', description: 'Description 3', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''}]},
    {employee_name: 'José Antonio Pérez Florencia', job_position: 'Software Developer', avatar: 'http://i.pravatar.cc/150?img=2',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, eu auctor convallis ultrices volutpat himenaeos',
     owner_id: '5bbdcc24698a67d75541832d', phone: '123456789', email: 'fakeemail@gmail.com', department: 'Technical',
    projects: [{name: 'Project Technical 1', description: 'Description 1', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''},
    {name: 'Project Technical 2', description: 'Description 2', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''},
    {name: 'Project Technical 3', description: 'Description 3', technologies: 'Ionic, Angular, MongoDB', thumbnail: ''}]},
    {employee_name: 'Patricia Acosta García', job_position: 'Marketing Account Manager', avatar: 'http://i.pravatar.cc/150?img=5',
     description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, eu auctor convallis ultrices volutpat himenaeos',
     owner_id: '5bbdcc24698a67d75541832d', phone: '123456789', email: 'fakeemail@gmail.com', department: 'Marketing',
    projects: [{name: 'Project Marketing 1', description: 'Description 1', technologies: 'Video 360', thumbnail: ''}]},
  ];

  constructor() { }

  initializeAppCliente(appID: string) {
    this.client = Stitch.initializeDefaultAppClient(appID);
  }

  getServiceClient(dbName: string) {
    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(dbName);
  }

  find(collection: string, filter: any) {
    return this.db.collection(collection).find(filter, { limit: 100}).asArray();
  }

  insertMany(collection: string, docs: any) {
    console.log('docs', docs);
    this.db.collection(collection).insertMany(docs).then(results => {
      const { insertedIds } = results;
      console.log(insertedIds);
    }).catch(err => {
      console.error(err);
    });
  }

  populateFakeEmployees() {
    this.insertMany('employees', this.fakeEmployees);
  }
}
