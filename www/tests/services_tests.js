'use strict';

describe('Testing the service', function () {
    var CardService;

    beforeEach(module('services'));

    describe('CardService', function () {
        beforeEach(inject(function (_CardService_) {
            CardService = _CardService_;
        }));

        describe('current week', function () {
            var dueDate;

            beforeEach(function () {
                var tmpDate = new Date();
                dueDate = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate());
            });

            it('if due date is today it\'s week 40', function () {
                var diffDays = 0;
                var expected = 40;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in 6 days it\'s week 40', function () {
                var diffDays = 6;
                var expected = 40;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in 7 days it\'s week 40', function () {
                var diffDays = 7;
                var expected = 39;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in 13 days it\'s week 39', function () {
                var diffDays = 13;
                var expected = 39;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in 14 days it\'s week 38', function () {
                var diffDays = 14;
                var expected = 38;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in 279 days it\'s week 1', function () {
                var diffDays = 279;
                var expected = 1;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });


            it('if due date is in 280 days it\'s week 1', function () {
                var diffDays = 280;
                var expected = 1;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });

            it('if due date is in more than 280 days it\'s week 1', function () {
                var diffDays = 500;
                var expected = 1;
                dueDate.setDate(dueDate.getDate() + diffDays);
                expect(CardService.getCurrentWeek(dueDate)).toBe(expected);
            });
            
        });

    });

});