'use strict'

describe 'Controller: QuestionCtrl', () ->

  # load the controller's module
  beforeEach module 'deskQuizApp'

  QuestionCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, $httpBackend) ->
    mockQuestions = [
      {name: 'Hello'}
    ]
    $httpBackend.when('GET', 'http://localhost:9000/quiz').respond(mockQuestions)

    scope = $rootScope.$new()
    QuestionCtrl = $controller 'QuestionCtrl', {
      $scope: scope
    }
    $httpBackend.flush()

  afterEach inject ($httpBackend) ->
     $httpBackend.verifyNoOutstandingExpectation()
     $httpBackend.verifyNoOutstandingRequest()

  # it 'should attach a list of awesomeThings to the scope', () ->
  #   expect(scope.questions.length).toBe 1
  it 'should validate a radio button has been checked', () ->
    scope.checkRadio 'this would be an answer'
    expect(scope.validAnswer).toBe true

