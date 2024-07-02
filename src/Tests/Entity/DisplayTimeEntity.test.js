import DisplayTimeEntity from 'Entity/DisplayTimeEntity';

test('construct and get time in milliseconds and display', () => {
    const dateTimeEntity = new DisplayTimeEntity(1, 2, 3, 4);

    expect(dateTimeEntity.hours).toBe(1);
    expect(dateTimeEntity.minutes).toBe(2);
    expect(dateTimeEntity.seconds).toBe(3);
    expect(dateTimeEntity.milliseconds).toBe(4);

    expect(dateTimeEntity.getTimeInMilliseconds()).toBe(3723004);
    expect(dateTimeEntity.getInDisplayFormat()).toBe('01:02:03.004');
});

test('create using fromDisplayFormat and get time in milliseconds and display', () => {
    const dateTimeEntity1 = DisplayTimeEntity.fromDisplayFormat('01:02:03.004');

    expect(dateTimeEntity1.hours).toBe(1);
    expect(dateTimeEntity1.minutes).toBe(2);
    expect(dateTimeEntity1.seconds).toBe(3);
    expect(dateTimeEntity1.milliseconds).toBe(4);

    expect(dateTimeEntity1.getTimeInMilliseconds()).toBe(3723004);
    expect(dateTimeEntity1.getInDisplayFormat()).toBe('01:02:03.004');

    const dateTimeEntity2 = DisplayTimeEntity.fromDisplayFormat('01:02:03.400');

    expect(dateTimeEntity2.hours).toBe(1);
    expect(dateTimeEntity2.minutes).toBe(2);
    expect(dateTimeEntity2.seconds).toBe(3);
    expect(dateTimeEntity2.milliseconds).toBe(400);

    expect(dateTimeEntity2.getTimeInMilliseconds()).toBe(3723400);
    expect(dateTimeEntity2.getInDisplayFormat()).toBe('01:02:03.400');
});

test('create using fromMilliseconds and get time in milliseconds and display', () => {
    const dateTimeEntity1 = DisplayTimeEntity.fromMilliseconds(3723004);

    expect(dateTimeEntity1.hours).toBe(1);
    expect(dateTimeEntity1.minutes).toBe(2);
    expect(dateTimeEntity1.seconds).toBe(3);
    expect(dateTimeEntity1.milliseconds).toBe(4);

    expect(dateTimeEntity1.getTimeInMilliseconds()).toBe(3723004);
    expect(dateTimeEntity1.getInDisplayFormat()).toBe('01:02:03.004');

    const dateTimeEntity2 = DisplayTimeEntity.fromMilliseconds(3723400);

    expect(dateTimeEntity2.hours).toBe(1);
    expect(dateTimeEntity2.minutes).toBe(2);
    expect(dateTimeEntity2.seconds).toBe(3);
    expect(dateTimeEntity2.milliseconds).toBe(400);

    expect(dateTimeEntity2.getInDisplayFormat()).toBe('01:02:03.400');
    expect(dateTimeEntity2.getTimeInMilliseconds()).toBe(3723400);

});
